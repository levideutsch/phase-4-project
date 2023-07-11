class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_photo, :password

  has_many :tweets 
  has_many :categories 
  
  # def tweets
  #   object.tweets.includes(:category, :user)
  # end

end
