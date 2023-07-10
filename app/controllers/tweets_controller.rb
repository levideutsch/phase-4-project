class TweetsController < ApplicationController



    def update
        tweet = current_user.tweets.find_by(id: params[:id].to_i).update!(tweet_params)
        render json: tweet, status: :accepted
    end


    def destroy 
        tweet = current_user.tweets.find_by(id: params[:id])
        tweet.destroy
        render json: {}
    end  


  
    def create
        current_user
        category =  Category.find_by(category: params[:category])
        if category == nil 
            render json: {error: "Category or text body blank"}, status: :unprocessable_entity
        else 
            tweet = current_user.tweets.create!(
                body: params[:body],
                category_id: category.id
            )
            render json: tweet, status: :created
        end
    end


    private

    def tweet_params
        params.permit(:body)
    end

end
