class TweetsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    # User Edits tweet
    def update
        # tweet = Tweet.find_by(params[:id])
        
        # chnage to current_user.tweets/find_by
        tweet = current_user.tweets.find_by(id: params[:id].to_i).update!(tweet_params)
        # Find the tweet by its ID
        # tweet = Tweet.find_by(id: params[:id].to_i)

        # Then update that tweet with the given params
        # tweet.update!(tweet_params)

        # Return Json status accepted
        render json: tweet, status: :accepted
    end

    # # User deletes tweet
    # def destroy

    # # chnage to current_user.tweets/find_by
    #   tweet =  current_user.tweets.find_by(id: params[:id])
    # #   tweet =  Tweet.find_by(id: params[:id])
    #     # Find the tweet by its ID
    #     # tweet = Tweet.find_by(id: params[:id])

    #     # Then destroy that tweet
    #     tweet.destroy

    #     # Then respond with an empty object
    #     render json: {}
    # end

    def destroy
        # Find the tweet by its ID, belonging to the current user
        tweet = current_user.tweets.find_by(id: params[:id])
      
        if tweet
          # If the tweet is found, then destroy it
          tweet.destroy
          render json: {}
        else
          # If the tweet is not found, return an appropriate response
          render json: { error: 'Tweet not found' }, status: :not_found
        end
      end


    # User creates new tweet
    def create

        # Make sure current_user is true
        # user = current_user
        current_user

        # Then find the (tweets) category by its ID
        category =  Category.find_by(category: params[:category])

        # If the category is nil
        if category == nil 
            # Respond with "Hey bro, you gotta select a category in order to actually tweet"
            render json: {error: "Select a category"}, status: :unprocessable_entity
        else 

            # But if the category is valid, the user is allowed to create a new tweet with a tweet body, and the category they selected
            tweet = current_user.tweets.create!(
                body: params[:body],
                category_id: category.id
            )

            # Then return all of that as Json
            render json: tweet, status: :created
        end
    end

    # Display all tweets
    def index

        # Checks if current user is logged in
        user = User.find_by(id: session[:user_id])

        # If true
        if user    
        # Display all tweets & include that tweets user and category
        tweets = Tweet.includes(:user, :category).all.order("created_at DESC")

        # Then return as Json
        render json: tweets, include: [:user, :category]
        else
        
        # If current_user is false, return this    
        render json: { error: "Not authorized" }, status: :unauthorized
        end
    end


    # View one specific tweet from logged in user 
    def show

        # If current_user is true
        user = User.find_by(id: session[:user_id])
        if user
        
        # Find that specific tweet by its ID    
        tweet = Tweet.find_by(id: [params[:id]])
        # Then render it
            render json: tweet, status: :ok
        else 
        # But if current_user is false, return this
            render json: { error: "Not Found"}, status: :unauthorized # Use unauthorized because we only want to look at current users data
        end
    end 

    private

    def tweet_params
        params.permit(:body)
    end

    def render_not_found_response
        render json: { error: "Tweet not found" }, status: :not_found
      end

         # POST error
    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
