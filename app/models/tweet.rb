class Tweet < ApplicationRecord
    belongs_to :user
    belongs_to :category

    # validates :body, presence: true, length: { maximum: 100 }
    validates :body, presence:true, uniqueness: { case_sensitive: false }
    

end
