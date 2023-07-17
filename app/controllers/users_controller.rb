class UsersController < ApplicationController

    skip_before_action :authorize, only: [:create]

 
    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :ok
    end

    def update
        user = User.find_by(id: params[:id].to_i)
        user.update!(user_params_photo)
        render json: user, status: :accepted
      end

    def show
        current_user
        render json: current_user, status: :ok
    end

    private 

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

    def user_params_photo
        params.permit(:profile_photo)
    end

end