class TweetSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :category_id
  
  belongs_to :user
  belongs_to :category
 


end
