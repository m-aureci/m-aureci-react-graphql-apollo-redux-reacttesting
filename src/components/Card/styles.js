import styled from 'styled-components';

export const Container = styled.article`
	flex: 50%;
	padding: 5px;

	@media (max-width: 767px) {
		flex: 100%;
	}

	a {
		background-color: #fcfcfc;
		border: 1px solid #ddd;
		border-radius: 2px;
		color: #000;
		display: flex;
		padding: 10px;
		text-decoration: none;
	}
`;

export const Flag = styled.img`
	height: 33px;
	margin-right: 10px;
	vertical-align: middle;
	width: 50px;
`;

export const Country = styled.h2`
	font-size: 16px;
`;

export const Capital = styled.p`
	font-size: 16px;
`;