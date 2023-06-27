class CreateTweets < ActiveRecord::Migration[6.1]
  def change
    create_table :tweets do |t|
      t.integer :user_id
      t.integer :mood_id

      t.timestamps
    end
  end
end
