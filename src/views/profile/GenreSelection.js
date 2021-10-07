import Multiselect from 'multiselect-react-dropdown';

const GenreSelection = (props) => {
    const saveSelected = props.onClick;
    
    const allGenres = props.genresAll.map( genre => ({
        tag: genre
    }));

    const selected = props.genresSelected.map((genre) => ({
        tag: genre
    }));

    const passGenres = (e) => {
        saveSelected(e);
    };

    return (
        <Multiselect
                    customCloseIcon={<>❌</>}
                    displayValue="tag"
                    onRemove={passGenres}
                    onSearch={function noRefCheck(){}}
                    onSelect={passGenres}
                    options={allGenres}
                    selectedValues={selected}
        />  
    )
}

export default GenreSelection
