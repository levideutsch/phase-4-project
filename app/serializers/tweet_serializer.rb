class TweetSerializer < ActiveModel::Serializer
  attributes :id, :body
  
  belongs_to :user
  belongs_to :category
 


end
