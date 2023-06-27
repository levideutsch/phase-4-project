class User < ApplicationRecord
    has_many :tweets, dependent: :destroy
    has_many :categories, through: :tweets  

    #To protect the password
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 5 }
    validates :password_confirmation, presence: true

end
