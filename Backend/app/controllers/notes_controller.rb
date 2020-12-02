class NotesController < ApplicationController

    def index

    end

    def show

    end

    def create
        note = Note.create(note_params)

        render json: note
    end

    def update
        note = Note.find_by(id: params[:id]).update(note_params)
    end

    def destroy

    end

    private
    def note_params
        params.require(:note).permit(:id, :title, :body, :language_id)
    end

end
