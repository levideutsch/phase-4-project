class Changecolumnnameincategories < ActiveRecord::Migration[6.1]
  def change
    rename_column :categories, :mood, :category
  end
end
