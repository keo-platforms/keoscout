# frozen_string_literal: true

class PostsController < InertiaController
  def index
  end

  def new
  end

  def show
    post = Post.find(params[:id])
    @post = post.as_json(include: :images) # serialize_post(post)
  end

  def update
    post = Post.find(params[:id])
    post.update!(price: params[:price])
    redirect_to post
  end

  def edit
    post = Post.find(params[:id])
    @post = post.as_json(Post::JSON_OPTIONS)
  end

  def create
    if Current.user.nil?
      Current.user = User.create!
      session[:user_id] = Current.user.id
    end
    post = Post.create!(user_id: Current.user.id)
    redirect_to edit_post_path(post)
  end

  def attach_file
    post = Post.find(params[:id])
    blob = ActiveStorage::Blob.find_signed!(params.require(:signed_blob_id))

    post.images.attach(blob)

    render json: post.images.attachments.last.as_json # { file: serialize_file(post.images.attachments.last) }
  end

  # private

  # def serialize_post(post)
  #   {
  #     id: post.id,
  #     price: post.price,
  #     images: post.images.attachments.map { |file| serialize_file(file) }
  #   }
  # end

  # def serialize_file(file)
  #   {
  #     id: file.id,
  #     filename: file.filename.to_s,
  #     byte_size: file.byte_size,
  #     content_type: file.content_type
  #   }
  # end
end
