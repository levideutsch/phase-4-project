class Addcolumntotweets < ActiveRecord::Migration[6.1]
  def change
    add_column :tweets, :body, :string

  end
end
