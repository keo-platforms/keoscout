class ActiveStorage::Attached::One
  def as_json(options = nil)
    attachment.as_json(options)
  end
end

class ActiveStorage::Attached::Many
  def as_json(options = nil)
    attachments.map { |attachment| attachment.as_json(options) }
  end
end


Rails.application.config.to_prepare do
  class ActiveStorage::Attachment < ActiveStorage::Record
    DEFAULT_OPTIONS = {
      only: [],
      methods: [ :id, :filename, :byte_size, :content_type, :signed_id, :url ]
    }

    def serializable_hash(options = nil)
      options = DEFAULT_OPTIONS.merge(options || {})
      variants = options.delete(:variants) || []

      super(options.presence || DEFAULT_OPTIONS).merge(
        variants: variants.each_with_object({}) do |variant, hash|
          hash[variant] = self.variant(variant).processed.url
        end
      )
    end
  end
end
