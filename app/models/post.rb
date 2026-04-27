class Post < ApplicationRecord
  JSON_OPTIONS = {
    include: {
      images: ActiveStorage::Attachment::DEFAULT_OPTIONS.merge(variants: [ :blurred ])
    }
  }

  has_many_attached :images do |image|
    image.variant :blurred, resize_to_limit: [ 100, 100 ], gaussblur: 20
  end
end
