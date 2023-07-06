class CategoriesController < ApplicationController
    

    def create 
      category = Category.new(category_params)
      category.save!
      render json: category, status: :created
    end

    
    def index
        category = Category.all.includes(:tweets).order("tweets.created_at DESC")
        render json: category, status: :ok
    end 

    private 
    
    def category_params
        params.permit(:category)
    end

end
    # def show
    #     user = User.find_by(id: session[:user_id])
    #     if user

         
    #       category = Category.find_by(id: params[:id])

         
    #       tweets = category.tweets.includes(:user) 

         
    #       render json: { category: category, tweets: tweets.as_json(include: :user) }
    #     else

          
    #       render json: { error: "Not Found" }, status: :unauthorized
    #     end
    #   end