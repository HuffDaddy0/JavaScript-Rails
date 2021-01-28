class NotesController < ApplicationController

    def index
    end

    def show
    end

    def create
        note = Note.new(note_params)
        note.save

        render json: note
    end

    def update
        note = Note.find_by(id: params[:id])
        if note.update(note_params) 
            render json: {
                note: note,
                status: 200
                }
        else
            render json: {
                status: 401 
                }
        end
    end

    def destroy

    end

    private
    def note_params
        params.require(:note).permit(:id, :title, :body, :language_id)
    end

end
