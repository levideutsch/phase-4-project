class CategoriesController < ApplicationController

    # skip_before_action :authorize, only: [:index]
    

    # User creates new category
    def create 

        # Create new category with the given params
        category = Category.new(category_params)

        # If category saved
        if category.save
        # Return as Json status created  
          render json: category, status: :created
        else
        # If it does not save, return errors  
          render json: category.errors, status: :unprocessable_entity
        end
    end

    # Displays all categories
    def index

        # Grab all categories in order of ABC
        # category = Category.all.order("category ASC")
        category = Category.all.includes(:tweets).order("tweets.created_at DESC")
        # Then render that with a status of ok
        render json: category, status: :ok
    end 

    # Display single category
    def show

        # If current_user true
        user = User.find_by(id: session[:user_id])
        if user

          # Find that category by its ID
          category = Category.find_by(id: params[:id])

          # Then include the categories tweets with each tweets user 
          tweets = category.tweets.includes(:user) # Include the associated user for each tweet

          # Then render the categoy with its tweet
          render json: { category: category, tweets: tweets.as_json(include: :user) }
        else

          # If current_user is false, do this
          render json: { error: "Not Found" }, status: :unauthorized
        end
      end

  

    private 
    
    def category_params
        params.permit(:category)
    end

end
