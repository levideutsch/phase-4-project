class User < ApplicationRecord
    has_many :tweets, dependent: :destroy
    has_many :categories, -> { distinct }, through: :tweets

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, presence: { on: create }, length: { minimum: 5 }, :if => :password_digest_changed?
    validates :password_confirmation, presence: { on: create }
end
