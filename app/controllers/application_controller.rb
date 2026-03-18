class ApplicationController < ActionController::Base
  use_inertia_instance_props

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :set_locale

  private
  PARAGLIDE_COOKIE = "PARAGLIDE_LOCALE"

  def set_locale
    cookie_val = cookies[PARAGLIDE_COOKIE]
    if cookie_val.present? && I18n.available_locales.map(&:to_s).include?(cookie_val)
      I18n.locale = cookie_val
    else
      I18n.locale = extract_locale || I18n.default_locale
      cookies[PARAGLIDE_COOKIE] = I18n.locale
    end
  end

  def extract_locale
    parsed_locale = request.host.split(".").last
    I18n.available_locales.map(&:to_s).include?(parsed_locale) ? parsed_locale : nil
  end
end
