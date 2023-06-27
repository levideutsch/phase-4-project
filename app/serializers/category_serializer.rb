class CategorySerializer < ActiveModel::Serializer
  attributes :id, :category
  has_many :tweets
  has_many :users, through: :tweets
  
end
