<?php

namespace app\portal\controller;

use cmf\controller\HomeBaseController;

class DspController extends HomeBaseController
{
	public function index()
	{
		return $this->fetch('/dsp');
	}

	public function dspRegister()
	{
		print_r($_POST);exit;
		$post = input('post.');

		$result = $this->validate($post, 'PortalDsp', [], true);

		if (true !== $result) {
			$this->result('400','注册失败', $result);
		}

		// halt(captcha_check($result['codes']));

		if(captcha_check($result['codes'])){
		 	//验证码正确
		 	$this->success('注册成功');
		 	return ['codes' => '200'];
		 	$insert_data = [
		 		'dsp_name' => $post['dsp_name'],
		 		'user_pwd' => $post['user_pwd'],
		 		'user_phone' => $post['user_']
		 	];
		 	
		} else {
			//验证码不正确
			$this->error('注册失败');
			$this->result('400', '注册失败', ['codes'=>'验证码不正确']);
		}

	}
}