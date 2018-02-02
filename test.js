//
// Copyright © 2017-Present, Punchh, Inc.
// All rights reserved.
//
'use strict';

import React from 'react';
import Autolink from 'react-native-autolink';
import { View, NativeModules, Image, ScrollView, Platform } from 'react-native';
import { Header, BaseScene, Background } from '../CommonComponent';

export default class InfoScene extends BaseScene {
	constructor(props, context) {
		super(props, context);
		this.sendGAEvent('scene_Info');
	}

	backButton(styles) {
		if (Platform.OS === 'ios') {
			return {
				title: styles.header.backTitle,
				onPress: () => {
					NativeModules.RNInfoScene.backButtonTapped(this.props.selfInstance);
				},
				btnStyle: { layout: styles.header.leftButton }
			};
		}
	}

	renderBackground(styles) {
		return <Background style={styles.background.style} image={styles.background.image} />;
	}

	renderHeader(styles) {
		return <Header title={this.props.title} leftButton={this.backButton(styles)} style={styles.header.style} />;
	}

	renderContent(styles) {
		return (
			<ScrollView style={styles.scrollViewStyle} bounces={false}>
				<Autolink
					style={styles.descriptionStyle}
					linkStyle={styles.descriptionStyle.linkStyle}
					text={this.props.content || ''}
					email
					phone
					url
				/>
			</ScrollView>
		);
	}

	renderInfoLogo(styles) {
		if (!this.props.hideInfoLogo || (this.props.hideInfoLogo && this.props.hideInfoLogo == 'false')) {
			return <Image source={styles.infoImage.source} style={styles.infoImage.style} />;
		}
	}

	render() {
		const styles = this.styleSheet();
		return (
			<View style={styles.container}>
				{this.renderBackground(styles)}
				{this.renderHeader(styles)}
				{this.renderInfoLogo(styles)}
				{this.renderContent(styles)}
			</View>
		);
	}

	defaultStyles() {
		return {
			container: {
				flex: 1
			},
			background: {
				style: {},
				image: { uri: 'info_bg' }
			},
			infoImage: {
				source: { uri: 'info_logo' },
				style: {
					marginTop: 20,
					width: '30%',
					height: '30%',
					backgroundColor: 'gray',
					alignSelf: 'center'
				}
			},
			descriptionStyle: {
				textAlign: 'center',
				color: 'black',
				marginTop: 20,
				marginBottom: 20,
				fontSize: 16,
				marginLeft: 10,
				marginRight: 10
			},
			linkStyle: {
				color: 'red'
			},
			scrollViewStyle: {
				flex: 1,
				marginBottom: 50,
				marginTop: 20
			},
			header: {
				backTitle: 'Back',
				leftButton: {},
				style: {}
			}
		};
	}
}
