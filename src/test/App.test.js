import React from "react";
import ReactDOM from "react-dom";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";

configure({ adapter: new Adapter() });

const mockFetch = data => {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
};

const artists = [
  { name: "Tame Impala", genre: "Rock", _id: 112233 },
  { name: "Radiohead", genre: "Alternative", _id: 223344 },
];

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("the component renders correctly upon initialising", () => {
  const renderedComponent = mount(<App />);
  expect(renderedComponent).toMatchSnapshot();
});

test("fetches data and sets it in state when the component mounts", async () => {
  global.fetch = mockFetch(artists);

  const renderedComponent = await mount(<App />);

  await renderedComponent.update();

  expect(global.fetch).toHaveBeenCalled();
  expect(global.fetch).toHaveBeenCalledWith("https://music-library-api.herokuapp.com/artists");
  expect(renderedComponent.state("artists").length).toEqual(2);
});

test("if no data should display a loading div", () => {
  const renderedComponent =  mount(<App />);
  const loadingDiv = renderedComponent.find('div');

  expect(loadingDiv.text()).toEqual('Loading...');
  expect(loadingDiv.html()).toEqual('<div>Loading...</div>');
})

test('displays the items in state as a list and a add more button', () => {
  const renderedComponent = mount(<App />);

  renderedComponent.setState({artists});
  renderedComponent.update();

  expect(renderedComponent.find('li').length).toEqual(2)
  expect(renderedComponent.find('.button-add-more').text()).toEqual('Add more')
})

test('toggles between button and form', () => {  
  const renderedComponent = mount(<App />);

  renderedComponent.setState({artists});
  renderedComponent.update();

  const addMoreButton = renderedComponent.find('.button-add-more');

  addMoreButton.simulate('click');

  expect(renderedComponent.state('showInput')).toEqual(true);
  expect(renderedComponent.find('form').children().length).toEqual(4);
  expect(renderedComponent.find('.button-add-more')).toEqual({});
})