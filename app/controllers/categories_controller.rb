class CategoriesController < ApplicationController

    skip_before_action :authorize, only: [:index]

    # # User creates new category 
    # def create
    #     check = Category.find_by(category: params[:category])
    #     if check == nil
    #         category = Category.create!(category_params)
    #         render json: category, status: :created
    #     else 
    #         render json: {error: "Category already exists"}, status: :unprocessable_entity
    #     end
    # end

    def create 
        category = Category.new(category_params)

        if category.save
          render json: category, status: :created
        else
          render json: category.errors, status: :unprocessable_entity
        end
    end

    # Displays all categories
    def index
        category = Category.all.order("category ASC")
        render json: category, status: :ok
    end 

    # Displays one specific category with all its related tweets
    # def show 

    #     user = User.find_by(id: session[:user_id])
    #     if user

    #     category = Category.find_by(id: [params[:id]])
    #     tweet = category.tweets
    #     render json:  { category: category, tweets: tweet }
    #     else 
    #     #     render json: { error: "Category not found" }, status: :not_found
    #     #   end
    #         render json: { error: "Not Found"}, status: :unauthorized # Use unauthorized because we only want to look at current users data
    #     end
    # end 

    def show
        user = User.find_by(id: session[:user_id])
        if user
          category = Category.find_by(id: params[:id])
          tweets = category.tweets.includes(:user) # Include the associated user for each tweet
          render json: { category: category, tweets: tweets.as_json(include: :user) }
        else
          render json: { error: "Not Found" }, status: :unauthorized
        end
      end

  

    # private 
    
    def category_params
        params.permit(:category)
    end

end
