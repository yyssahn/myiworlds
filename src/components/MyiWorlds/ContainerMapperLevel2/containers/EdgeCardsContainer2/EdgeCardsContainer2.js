/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, createFragmentContainer } from 'react-relay';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import s from './EdgeCardsContainer2.css';
import Link from '../../../../Link';

class EdgeCardsContainer2 extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    circle: PropTypes.object,
    title: PropTypes.string,
  };

  static defaultProps = {
    circle: null,
    title: '',
  };

  render() {
    return (
      <Card className={s.root}>
        <div className={s.header}>
          <Typography type="display1" gutterBottom>
            {this.props.circle.title}
          </Typography>
        </div>
        <Divider light style={{ marginBottom: '72px' }} />

        <Grid className={s.grid} container>
          {this.props.circle.linesMany.edges.map(({ node }) =>
            <Grid item sm={4} key={node._id}>
              <Card>
                {node.media.value
                  ? <CardMedia
                    className={s.cardMedia}
                    image={node.media.value}
                    title={node.media.title}
                  />
                  : null}

                <CardContent>
                  {node.title
                    ? <Typography type="headline" component="h2">
                      {node.title}
                    </Typography>
                    : null}
                  {node.description
                    ? <Typography component="p">
                      {node.description}
                    </Typography>
                    : null}
                </CardContent>

                <CardActions>
                  <Link to={node.pathFull} style={{ textDecoration: 'none' }}>
                    <Button dense color="primary">
                      VIEW PAGE
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>,
          )}
        </Grid>
        <Divider light />
      </Card>
    );
  }
}

export default createFragmentContainer(
  withStyles(s)(EdgeCardsContainer2),
  graphql`
    fragment EdgeCardsContainer2_circle on Circle {
      title
      linesMany {
        edges {
          node {
            _id
            media {
              title
              value
            }
            title
            type
            description
            pathFull
          }
        }
      }
    }
  `,
);
