class Changecolumnnameintweets < ActiveRecord::Migration[6.1]
  def change
    rename_column :tweets, :mood_id, :category_id
  end
end
