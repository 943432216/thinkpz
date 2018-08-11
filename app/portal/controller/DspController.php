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
		$post = input('post.');
		$result = $this->validate($post, 'PortalDsp', [], true);

		if (true !== $result) {
			$this->result('400','注册失败', $result);
		}

		if(captcha_check($result['codes'])){
		 	//验证码正确
		 	$insert_data = [
		 		'dsp_name' => $post['dsp_name'],
		 		'user_pwd' => $post['user_pwd'],
		 		'user_phone' => $post['user_']
		 	];
		 	
		} else {
			//验证码不正确
			$this->result('400', '注册失败', ['codes'=>'验证码不正确']);
		}

	}
}