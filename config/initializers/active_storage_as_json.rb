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
      methods: [ :id, :filename, :byte_size, :content_type, :signed_id, :path ]
    }

    def serializable_hash(options = nil)
      super(options.presence || DEFAULT_OPTIONS)
    end

    def path
      Rails.application.routes.url_helpers.rails_storage_proxy_url(self, only_path: true) # host: Rails.application.config.action_controller.asset_host)
    end
  end
end
