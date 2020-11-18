class LanguagesController < ApplicationController
    before_action :find_language, only: [:show]

    def index
        languages = Language.all
        render json: languages, include: [:notes]
    end

    def show
        # language = Language.find_by(id: params[:id])

        render json: @language, include: [:notes]
    end

    def create
        #byebug
        Language.create(language_params)
    end

    def edit
        @language.update(language_params)
    end

    def destroy
        @language.destroy
    end

    private
    def language_params
        params.require(:language).permit(:name, :category)
    end
    def find_language
        @language = Language.find_by(id: params[:id])
    end
end
