class Changemoodtablename < ActiveRecord::Migration[6.1]
  def change
    rename_table :moods, :categories
  end
end
