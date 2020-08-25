import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "../css/Home.css";

class Home extends React.Component {
	state = {
		isLoading: true,
		movies: [],
	};

	getMovies = async () => {
		const {
			data: {
				data: { movies },
			},
		} = await axios.get(
			"https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
		);
		this.setState({ movies, isLoading: false });
	};

	componentDidMount() {
		this.getMovies();
	}

	render() {
		const { isLoading, movies } = this.state;
		return (
			<section className="container">
				{isLoading ? (
					<div className="loader">
						<span className="loader_text">Loading....</span>
					</div>
				) : (
					<div className="movies">
						{movies.map((movie) => {
							return (
								<Movie
									id={movie.id}
									year={movie.year}
									title={movie.title}
									poster={movie.medium_cover_image}
									summary={movie.summary}
									genres={movie.genres}
									key={movie.id}
								/>
							);
						})}
					</div>
				)}
			</section>
		);
	}
}

export default Home;
