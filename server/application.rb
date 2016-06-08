require 'sinatra'
require 'json'
require 'securerandom'
require 'digest'

class ApiApplication < Sinatra::Base

    challenges = {}
    credentials = {
        'sample' => 'hoge',
        'user1' => 'user1-pass',
    }
    access_tokens = {}
    
    get '/auth_token/challenge/:username' do
        challenge = SecureRandom.hex
        challenges[params['username']] = challenge
        {"challenge": challenge}.to_json
    end
    
    post '/auth_token/generate/:username' do
        username = params['username']
        auth = request.env["HTTP_X_AUTHORIZATION"]
        next {"status": "error", "msg": "no X-Authorization header"}.to_json unless auth
        challenge, response = auth.split ':'
        next {"status": "error", "msg": "no such challenge"}.to_json unless challenges[username]
        next {"status": "error", "msg": "no such challenge"}.to_json unless credentials[username]
        challenges[username] = nil
        password = Digest::SHA256.hexdigest(credentials[username])
        digest_correct = Digest::SHA256.hexdigest("#{username}:#{password}:#{challenge}")
        if digest_correct == response then
            access_token = SecureRandom.hex
            access_tokens[access_token] = username
            {
                "status": "ok",
                "access_token": access_token,
            }.to_json
        else
            {"status": "failed", "msg": "incorrect digest"}.to_json
        end
    end
    
    get '/' do
        redirect '/index.html'
    end
    
    get '/api/v1/all' do
        access_token = request.env["HTTP_X_ACCESS_TOKEN"]        
        next {"status": "error", "msg": "not authorized"}.to_json unless access_tokens.has_key?(access_token)
        [
            {name: 'grege', count: rand(500)+100},
            {name: 'hh', count: rand(500)+100},
            {name: 'hrtwe', count: rand(500)+100},
        ].to_json
    end
end
