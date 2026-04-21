class User < ApplicationRecord
  has_one_attached :profile_image

  after_create_commit :update_profile_image_from_identity

  private

  def update_profile_image_from_identity
    return if profile_image.attached?

    identity = identities.find { |identity| identity.info["image"].present? }
    return unless identity

    profile_image.attach(io: URI.open(identity.info["image"]), filename: "#{id}_profile_image.jpg")
  end
end
