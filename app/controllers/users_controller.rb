class UsersController < ApplicationController

    skip_before_action :authorize, only: [:create, :show]

 
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


    #   def show
    #       if current_user
    #         all_tweets = Tweet.includes(:category).order("created_at DESC")
    #         response = {
    #           id: current_user.id,
    #           username: current_user.username,
    #           profile_photo: current_user.profile_photo,
    #           password: nil,
    #           tweets: all_tweets.as_json(only: [:id, :body], include: { category: { only: [:id, :category] }, user: { only: [:id, :username] } }),
    #           categories: current_user.categories
    #         }
    #         render json: response, status: :ok
    #       else
    #         render json: { error: "Not authorized" }, status: :unauthorized
    #       end
    #     end

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