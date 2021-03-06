import React, { useState, useEffect } from "react";
import { Button, Form, Col } from "react-bootstrap";
import ConfigureInfo from "../../configureInfo";
import moment from "moment";
import Spinner from "../layout/spinner";
import "../../CSS/show.css";

const AnimeInfo = ({ match }) => {
  const [animeInfo, setAnimeInfo] = useState(null);
  const [episodes, setEpisodes] = useState(1);

  useEffect(() => {
    const getInfo = async () => {
      try {
        let response = await fetch(
          `https://api.jikan.moe/v3/anime/${match.params.id}`
        );
        response = await response.json();
        setAnimeInfo(response);
      } catch (err) {
        console.log(err);
      }
    };
    getInfo();
  }, []);

  const SetEvent = (props) => {
    const { title, image_url, aired, url, broadcast } = props;

    var gapi = window.gapi;
    var CLIENT_ID = ConfigureInfo.CLIENT_ID;
    var API_KEY = ConfigureInfo.API_KEY;

    var DISCOVERY_DOCS = [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ];

    var SCOPES = "https://www.googleapis.com/auth/calendar.events";

    const handleClick = (date) => {
      date.add(
        parseInt(
          broadcast.slice(broadcast.length - 8, broadcast.length - 6),
          10
        ),
        "minutes"
      );
      date.add(
        parseInt(
          broadcast.slice(broadcast.length - 11, broadcast.length - 9),
          10
        ) - 9,
        "hours"
      );
      const startDate = date.format();
      const endDate = date.add(30, "minutes").format();
      const until =
        date.add(episodes - 1, "weeks").format("YYYYMMDDTHHmmss") + "Z";
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

      gapi.load("client:auth2", () => {
        console.log("loaded client");

        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });

        gapi.client.load("calender", "v3");

        gapi.auth2
          .getAuthInstance()
          .signIn()
          .then(() => {
            var event = {
              summary: title,
              start: {
                dateTime: startDate,
                timeZone: tz,
              },
              end: {
                dateTime: endDate,
                timeZone: tz,
              },
              gadget: {
                link: url,
                iconLink: image_url,
                display: "icon",
                title: title,
              },
              recurrence: [`RRULE:FREQ=WEEKLY;UNTIL=${until}`],
              reminders: {
                useDefault: false,
                overrides: [{ method: "popup", minutes: 30 }],
              },
            };

            var request = gapi.client.calendar.events.insert({
              calendarId: "primary",
              resource: event,
            });

            request.execute();
            setTimeout(() => {
              window.alert(`${title} was added`);
            }, 2);
          });
      });
    };

    return handleClick(moment(aired.from));
  };

  const getGenre = () => {
    return animeInfo.genres.map((genre) => genre.name + " ");
  };

  const getStudios = () => {
    return animeInfo.studios.map((studio) => studio.name + " ");
  };

  return (
    <div>
      {animeInfo === null ? (
        <Spinner />
      ) : (
        <div className="container" style={{ position: "relative" }}>
          <div className="row">
            <h3>{animeInfo.title}</h3>
          </div>

          <div className="row">
            <div className="col-sm-4 col-lg-4">
              <div className="row animeImage" style={{ paddingBottom: "2rem" }}>
                <img
                  className="img-fluid"
                  src={animeInfo.image_url}
                  alt="Key Visual"
                  width="225"
                  height="318"
                />
              </div>
              <div className="row">Genres: {getGenre()}</div>
              <div className="row">
                Airing:{" "}
                {animeInfo.airing ? (
                  <p style={{ color: "green", paddingLeft: "10px" }}>True</p>
                ) : (
                  <p style={{ color: "red", paddingLeft: "10px" }}>False</p>
                )}
              </div>
              <div className="row">Source: {animeInfo.source}</div>
              <div className="row">Studios: {getStudios()}</div>
            </div>
            <div
              className="col-sm-8 col-lg-8"
              style={{ paddingTop: "1rem", paddingBottom: "3rem" }}
            >
              <div className="row">
                <b>Synopsis</b>
              </div>
              <div className="row scrollable">{animeInfo.synopsis}</div>
              <div className="row setEventButton">
                <Form>
                  <Form.Row>
                    <Col>
                      <Form.Label
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textAlign: "center",
                          paddingTop: "10px",
                        }}
                      >
                        Episodes
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        as="select"
                        onChange={(number) => setEpisodes(number.target.value)}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                        <option>25</option>
                      </Form.Control>
                    </Col>

                    {animeInfo.airing ? (
                      <Button
                        variant="primary"
                        onClick={() => SetEvent(animeInfo)}
                      >
                        Set Event
                      </Button>
                    ) : (
                      <Button variant="secondary" disabled>
                        Set Event
                      </Button>
                    )}
                  </Form.Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeInfo;
