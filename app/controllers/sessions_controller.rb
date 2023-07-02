class SessionsController < ApplicationController

    skip_before_action :authorize, only: [:create]

    #Allows user to sign in
    # def create
    #     user = User.find_by(username: params[:username])
    #     if !user
    #         render json: { error: "Username non existant" }, status: :unauthorized
    #     elsif !user&.authenticate(params[:password])
    #         render json: { error: "Invalid password" }, status: :unauthorized
    #     elsif user&.authenticate(params[:password]) 
    #         session[:user_id] = user.id
    #         render json: user, status: :created
    #     end
    # end    

    # Sign in user
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
          session[:user_id] = user.id
          render json: user, status: :created
        else
          render json: { errors: ["Invalid username or password"] }, status: :unauthorized
        end
    end

    # Sign out user
    def destroy
        session.delete :user_id
        head :no_content
    end

end
