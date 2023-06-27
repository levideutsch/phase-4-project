class Category < ApplicationRecord
    has_many :tweets, dependent: :destroy
    has_many :users, through: :tweets 
  
    validates :category, presence: true, uniqueness: true, length: { maximum: 30 }
  end