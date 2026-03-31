# frozen_string_literal: true

class InertiaController < ApplicationController
  use_inertia_instance_props
  # Share data with all Inertia responses
  # see https://inertia-rails.dev/guide/shared-data
  #   inertia_share user: -> { Current.user&.as_json(only: [:id, :name, :email]) }
end
