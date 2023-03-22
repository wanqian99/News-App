import { render, fireEvent, screen} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import App from './App.js';
import NavTabs from "./components/bottomTabs.js"
import Home from './screens/homeScreen.js'
import Categories from './screens/categoriesScreen.js'
import Search from './screens/searchScreen.js'
import News from './screens/homeScreen.js'

import { ThemeProvider } from './utils/ThemeManager.js'
import { Context, news, setCategory, setNews, setSource, setNewsType, setRefreshType } from './API/context.js'
import { categories, sources, getNewsAPI, getSourceAPI } from './API/api.js'


// Test snapshots of the screens
describe('Testing screens: ', () => {
  const theme = 'light';

  // testing snapshot of home screen
  it('testing home screen', async () => {
    const screen = render(
      <Context value={news}>
        <ThemeProvider value={theme}>
          <Home />
        </ThemeProvider>
      </Context>
    );

    expect(screen).toMatchSnapshot();
  });


  // testing snapshot of categories screen
  it('testing categories screen', async () => {
    const screen = render(
      <Context>
        <ThemeProvider value={theme}>
          <Categories />
        </ThemeProvider>
      </Context>
    );

    expect(screen).toMatchSnapshot();
  });


  // testing snapshot of search screen
  it('testing search screen', async () => {
    const screen = render(
      <Context value={news}>
        <ThemeProvider value={theme}>
          <Search />
        </ThemeProvider>
      </Context>
    );

    expect(screen).toMatchSnapshot();
  });


  // testing snapshot of news component
  it('testing news component', async () => {
    const screen = render(
      <Context value={news}>
        <ThemeProvider value={theme}>
          <News />
        </ThemeProvider>
      </Context>
    );
    expect(screen).toMatchSnapshot();
  });
});





// Test the functions of the news app
describe('Testing functions: ', () => {
  const theme = 'light';
  // test the search bar function in the search screen
  it('search bar', async () => {
    const component = (
      <Context value={setNews, setCategory, setSource, setNewsType, setRefreshType}>
        <NavigationContainer>
          <NavTabs>
            <ThemeProvider value={theme}>
              <Categories />
            </ThemeProvider>
          </NavTabs>
        </NavigationContainer>
      </Context>
    );

    // render the screen
    render(component);

    // To test the search bar in the search screen, i would have to get get the news first. (fetchNews in context.js)
    // A workaround is to start from the categories screen, and select the general category, to trigger the fetch news function.

    // find general category source button
    const toClick = await screen.findByText('GENERAL');
    // click the button (trigger fetchNews to get the news to search from)
    fireEvent(toClick, 'press');

    // check that user has been navigated to home screen (whose header is 'News')
    const newHeader = await screen.findByText('News');
    // check that the news call is GENERAL news (as per the general button clicked above)
    const newBody = await screen.findByText('general');

    // check that the user has been navigated to the new header and body after clicking on a category in the Categories Screen
    expect(newHeader).toBeTruthy();
    expect(newBody).toBeTruthy();

    // find the search tab button on the bottom navigation
    const searchBtn = await screen.findByText('Search');
    // click on the button to get the search screen
    fireEvent(searchBtn, 'press');

    // check that the header has been changed to Search News
    const searchHeader = await screen.findByText('Search News');
    // check that the searchHeader is true (user has been navigated to the search screen)
    expect(searchHeader).toBeTruthy();

    // get the text input element
    const textInput = screen.getByTestId("searchInput");
    // dummy keyword to search for
    const searchKeyword = 'a';
    // this changeText function triggers the searchForNews function in searchScreen.js
    fireEvent.changeText(textInput, searchKeyword);

    // check that we have a searchResult
    const checkTextInput = screen.getByTestId("searchResult");
    // check that checkTextInput is true and defined
    expect(checkTextInput).toBeTruthy();
    expect(checkTextInput).toBeDefined();

    // console.log(checkTextInput.props);
  });
});





// Test App component
describe('Testing <App /> : ', () => {
  it('has 1 child', () => {
    const tree = render(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
  it('renders correctly', () => {
    const tree = render(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});





// Test the news apis
describe('Testing api: ', () => {
  it('category api', () => {
    // check that the category api is not null
    expect(categories).not.toBeNull();
    // check that the category api has 7 categories
    expect(categories.length).toBe(7);
    // check that the first category is general
    expect(categories[0].name).toEqual("general");

    // sample url for the api
    const category_news = "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=ebe240a25c284b83bb9be18bf4e51023";

    // get general news with the function in api.js
    const general_news = getNewsAPI("general");
    //check that the returned url is not null
    expect(general_news).not.toBeNull();
    // check that the returned url is equal to the sample url above
    expect(general_news).toEqual(category_news);
  });


  it('sources api', () => {
    // check that the sources api is not null
    expect(sources).not.toBeNull();
    // check that the category api has 9 sources
    expect(sources.length).toBe(9);
    // check that the first source is bbc-news
    expect(sources[0].id).toEqual("bbc-news");

    // sample url for the api
    const source_news = "https://newsapi.org/v2/top-headlines?sources=bbc-news&language=en&apiKey=ebe240a25c284b83bb9be18bf4e51023";

    // get bbc-news news with the function in api.js
    const bbc_news = getSourceAPI("bbc-news");
    //check that the returned url is not null
    expect(bbc_news).not.toBeNull();
    // check that the returned url is equal to the sample url above
    expect(bbc_news).toEqual(source_news);
  });
});





// Test the navigation of the news app
describe('Testing react navigation: ', () => {
  const theme = "light";

  const component = (
    <Context value={setNews, setCategory, setSource, setNewsType, setRefreshType}>
      <NavigationContainer>
        <NavTabs>
          <ThemeProvider value={theme}>
            <Categories />
          </ThemeProvider>
        </NavTabs>
      </NavigationContainer>
    </Context>
  );


  it('category page contains header, category, sources', async () => {
    // render the screen
    render(component);

    // get the header
    const header = await screen.findByText('Discover');
    // get the category header
    const categories_onCategoriesScreen = await screen.findAllByText('Category');
    // get the source header
    const sources_onCategoriesScreen = await screen.findAllByText('Sources');
    // get the category carousel
    const categories_carousel = await screen.getByTestId('CategoryCarousel');
    // get the sources buttons
    const sources_btn = await screen.getByTestId('SourcesBtns');

    // check that they are all true, all of them exist on the screen
    expect(header).toBeTruthy();
    expect(categories_onCategoriesScreen).toBeTruthy();
    expect(sources_onCategoriesScreen).toBeTruthy();
    expect(categories_carousel).toBeTruthy();
    expect(sources_btn).toBeTruthy();
  });


  it('clicking on a category on categories screen takes you to the home screen with category news', async () => {
    // render the screen
    render(component);

    // find general category source button
    const toClick = await screen.findByText('GENERAL');
    // click the button
    fireEvent(toClick, 'press');

    // check that user has been navigated to home screen (whose header is 'News')
    const newHeader = await screen.findByText('News');
    // check that the news call is GENERAL news (as per the general button clicked above)
    const newBody = await screen.findByText('GENERAL');

    // check that the user has been navigated to the new header and body after clicking on a category in the Categories Screen
    expect(newHeader).toBeTruthy();
    expect(newBody).toBeTruthy();
  });


  it('clicking on a source on categories screen takes you to the home screen with source news', async () => {
    // render the screen
    render(component);

    // get all the source image buttons
    const btns = await screen.getAllByRole('imagebutton');
    // check that there are 9 such buttons
    expect(btns.length).toEqual(9);

    // find first source button (bbc-news)
    const toClick = await btns[0];

    // click the button
    fireEvent(toClick, 'press');

    // check that user has been navigated to home screen (whose header is 'News')
    const newHeader = await screen.findByText('News');
    // check that the news call is bbc-news news (as per the source button clicked above)
    const newBody = await screen.findByText('bbc-news');

    // check that the user has been navigated to the new header and body after clicking on a source in the Categories Screen
    expect(newHeader).toBeTruthy();
    expect(newBody).toBeTruthy();
  });
});
