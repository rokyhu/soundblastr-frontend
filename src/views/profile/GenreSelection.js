import Multiselect from 'multiselect-react-dropdown';

const GenreSelection = (props) => {
    
    const allGenres = props.genresAll.map( genre => ({
        tag: genre
    }));

    const selected = props.genresSelected.map((genre) => ({
        tag: genre
    }));
   
    

    return (
        <Multiselect
                    customCloseIcon={<>❌</>}
                    displayValue="tag"
                    onRemove={function noRefCheck(){}}
                    onSearch={function noRefCheck(){}}
                    onSelect={function noRefCheck(){}}
                    options={allGenres}
                    selectedValues={selected}
        />  
    )
}

export default GenreSelection
