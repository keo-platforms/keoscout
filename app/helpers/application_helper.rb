module ApplicationHelper
  def inertia_ssr_head
    head = super
    return head unless Rails.env.development? && head.present?

    public_output_dir = ViteRuby.config.public_output_dir.to_s
    return head if public_output_dir.empty?

    duplicated_prefix = %r{/#{Regexp.escape(public_output_dir)}/#{Regexp.escape(public_output_dir)}/+}

    head.gsub(duplicated_prefix, "/#{public_output_dir}/").html_safe
  end
end
