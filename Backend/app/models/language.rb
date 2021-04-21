class Language < ApplicationRecord
    has_many :notes
    validates_uniqueness_of :name
end
