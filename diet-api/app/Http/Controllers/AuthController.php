<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use App\Mail\VerificationEmail;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => 'Incorrect data'], 400);
        }
    
        $credentials = $request->only('email', 'password');
    
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if ($user->email_verified_at == null) {
                return response()->json(['error' => 'Email verification required'], 403);
            } else {
                $token = $user->createToken('token')->plainTextToken;
                return response()->json([
                    'message' => 'Logged successfully',
                    'user' => $user,
                    'token' => $token
                ], 200);
            }
        } else {
            return response()->json(['error' => 'Invalid data'], 400);
        }
    }    

    public function register(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => ['required', Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
        ]);
    
        $existingUser = User::where('email', $data['email'])->first();
    
        if ($existingUser) {
            return response()->json(['message' => 'User with that email already exists.'], 403);
        }
    
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);
        $verification_token = $user->createToken('verification_token')->plainTextToken;
        $user->verification_token = $verification_token;
        $user->save();

        Mail::to($user->email)->send(new VerificationEmail($verification_token));
    
        return response()->json(['message' => 'User created'], 201);
    }

    public function verify($token)
    {
        $user = User::where('verification_token', $token)->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid verification token'], 404);
        }

        if ($user->email_verified_at !== null) {
            return response()->json(['message' => 'User already verified'], 422);
        }

        $user->email_verified_at = now();
        $user->verification_token = null;
        $user->save();

        return response()->json(['message' => 'User verified successfully'], 200);
    }

    public function updatePassword(Request $request)
    {
        $data = $request->validate([
            'current_password' => ['required', 'string'],
            'new_password' => ['required', Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
        ]);

        $user = Auth::user();

        if (!Hash::check($data['current_password'], $user->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 400);
        }

        $user->password = Hash::make($data['new_password']);
        $user->save();

        return response()->json(['message' => 'Password has been successfully updated'], 200);
    }

    public function updateEmail(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email|unique:users',
            'current_password' => ['required', 'string'],
        ]);

        $user = Auth::user();

        if (!Hash::check($data['current_password'], $user->password)) {
            return response()->json(['error' => 'Password is incorrect'], 400);
        }

        $user->email = $data['email'];
        $user->save();

        return response()->json(['message' => 'Email updated'], 200);
    }

    public function logout(){
        auth()->user()->tokens()->delete();

        return response()->json(['message'=> 'Logged out'], 200);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $email = $request->input('email');
        $token = Str::random(32);

        DB::table('password_reset_tokens')->insert([
            'email' => $email,
            'token' => $token,
        ]);

        Mail::to($email)->send(new ResetPasswordMail($token));

        return response()->json(['message' => 'Password reset URL has been send'], 200);
    }

    public function setPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => ['required', Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
            'token' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
    
        $token = $request->input('token');
        $password = $request->input('password');
    
        $resetToken = DB::table('password_reset_tokens')
            ->where('token', $token)
            ->first();
    
        if (!$resetToken) {
            return response()->json(['error' => 'Invalid token'], 400);
        }
    
        $user = User::where('email', $resetToken->email)->first();
    
        if (!$user) {
            return response()->json(['error' => 'User with that email does not exist'], 404);
        }
    
        $user->password = Hash::make($password);
        $user->save();
    
        DB::table('password_reset_tokens')
            ->where('token', $token)
            ->delete();
    
        return response()->json(['message' => 'Password has been successfully reset'], 200);
    }
}