class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_photo, :password

  has_many :tweets #, serializer: TweetSerializer 
  has_many :categories #, through: :tweets
  
  # def tweets
  #   object.tweets.includes(:category, :user)
  # end

end
