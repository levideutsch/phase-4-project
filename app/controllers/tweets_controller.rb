class TweetsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    # User creates new tweet and 
    # def create 
    #     user = current_user
    #     category = Category.find_by(category: params[:category])
    #     if category  
    #         render json: {error: "Select a category"}, status: :unprocessable_entity 
    #     else 
    #         tweet = user.tweets.create!(
    #             body: params[:body],
    #             category_id: category.id
    #         )
    #         render json: tweet, status: :created
    #     end
    # end

    # User creates new tweet and 
    # def create 
    #     user = current_user
    #     category = Category.find_by(category: params[:category])
    #     if category  
    #         render json: {error: "Select a category"}, status: :unprocessable_entity 
    #     else 
    #         tweet = user.tweets.create!(
    #             body: params[:body],
    #             category_id: category.id
    #         )
    #         render json: tweet, status: :created
    #     end
    # end

    # User updates existing tweet 
    # def update 
    #     category = Category.find_by(category: params[:category])
    #     tweet = Tweet.find_by(params[:id])
    #     tweet.update!(
    #         body: params[:body],
    #         category_id: category.id
    #     )
    #     render json: recipe, status: :accepted 
    # end

    def update
            # tweet = Tweet.find_by(params[:id])
            tweet = Tweet.find_by(id: params[:id].to_i)
            tweet.update!(tweet_params)
            render json: tweet, status: :accepted
        end

    # User deletes tweet
    def destroy
        tweet = Tweet.find_by(id: params[:id])
        tweet.destroy
        render json: {}
    end

    # Displays all users tweets 
    # def show
    #     user = current_user
    #     tweets = user.tweets.all
    #     render json: tweets, status: :ok
    # end

    # Display all tweets from all users 
    # def index 
    #     tweets = Tweet.all.order("created_at DESC")
    #     render json: tweet, status: :ok
    # end

    # Display all logged in users tweets
    # def index
    #     tweets = current_user.tweets.order("created_at DESC")
    #     render json: tweets 
    # end

    # Logged in user creates a tweet
#     def create 
#         tweet = current_user.tweets.create(tweet_params)
#         if tweet.valid?
#             render json: tweet
#         else
#             render json: { errors: tweet.errors.full_messages }, status: :unprocessable_entity
#     end
# end

def create
    user = current_user
    category =  Category.find_by(category: params[:category])
    if category == nil 
        render json: {error: "Select a category"}, status: :unprocessable_entity
    else 
        tweet = user.tweets.create!(
            body: params[:body],
            category_id: category.id
        )
        render json: tweet, status: :created
    end
end

    
  

# def create
#     tweet = current_user.tweets.build(tweet_params)
#     category_ids = params[:category_ids] || []  # Assuming the category_ids are sent as an array in the request
  
#     if category_ids.empty?
#       # Handle the case when no category IDs are provided
#       tweet.category = []
#     else
#       # Assign categories to the tweet
#       tweet.category = Category.where(id: category_ids)
#     end
  
#     if tweet.save
#       render json: tweet
#     else
#       render json: { errors: tweet.errors.full_messages }, status: :unprocessable_entity
#     end
#   end


def index
    user = User.find_by(id: session[:user_id])
    if user    
    tweets = Tweet.includes(:user, :category).all.order("created_at DESC")
      render json: tweets, include: [:user, :category]
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end



    # View one specific tweet from logged in user 
    def show
        user = User.find_by(id: session[:user_id])
        if user
        tweet = Tweet.find_by(id: [params[:id]])
            render json: tweet
        else 
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
