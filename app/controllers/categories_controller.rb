class CategoriesController < ApplicationController
    

    def create 
      category = Category.new(category_params)
      category.save!
      render json: category, status: :ok
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
