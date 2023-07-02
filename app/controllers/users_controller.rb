class UsersController < ApplicationController

    # rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    # rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    skip_before_action :authorize, only: [:create, :show]

    #User signs up
    def create 
        # Create a user with these specific given attributes
        user = User.create(user_params)
        # If the user is valid
        if user.valid?
            # Create a new session 
            session[:user_id] = user.id
            # Then render it as json
            render json: user, status: :created
            # But if the user is not valid 
        else 
            # Return an error response
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

  

      # To update user with new profile photo
      def update
        # Find the user by its ID
        user = User.find_by(id: params[:id].to_i)
        # Then update that users profile photo
        user.update!(user_params_photo)
        # Then send it back as Json with the status of accepted
        render json: user, status: :accepted
      end


      # 
      def show
          user = current_user
          # Check if the current user is signed in
          if user

            # If true, grab all tweets along with their categories
            all_tweets = Tweet.includes(:category).order("created_at DESC")
            
            # Then the actual response should be the current_user id, username, profile_photo, password
            response = {
              id: user.id,
              username: user.username,
              profile_photo: user.profile_photo,
              password: nil,
              # Then a list of everyone's tweets along with those tweets categories
              tweets: all_tweets.as_json(only: [:id, :body], include: { category: { only: [:id, :category] }, user: { only: [:id, :username] } }),

              # Then a list of the current users categories
              categories: user.categories
              #categories: Category.all.as_json(only: [:id, :category])
            }
            # Then return the "response" as Json
            render json: response, status: :ok
          else
            # But if the current_user is false, return this
            render json: { error: "Not authorized" }, status: :unauthorized
          end
        end


    private 

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

    def user_params_photo
        # params.permit(:profile_photo)
        params.permit(:profile_photo)
    end

    # def render_not_found_response
    #     render json: { error: "User not found" }, status: :not_found
    #   end

    #      # POST error
    # def render_unprocessable_entity_response(invalid)
    #     render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    # end
end