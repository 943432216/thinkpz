<?php

namespace app\portal\controller;

use cmf\controller\HomeBaseController;
use think\Db;

class DspController extends HomeBaseController
{
	public function index()
	{
		return $this->fetch('/dsp');
	}

	// DSP注册信息添加
	public function dspRegister()
	{
		
		$post = input('post.');

		$result = $this->validate($post, 'PortalDsp', [], true);

		if (true !== $result) {
			$this->result($result, '400','注册失败');
		}

		if(captcha_check($post['codes'])){
		 	//验证码正确
		 	$city = get_city();
		 	$insert_data = [
		 		'dsp_name' => $post['dsp_name'],
		 		'user_pwd' => cmf_password($post['user_pwd']),
		 		'user_phone' => $post['user_phone'],
		 		'create_time' => time(),
		 		'address' => empty($city) ? '无法定位' : $city['region'] . $city['city'],
		 		'user_ip' => get_client_ip(),
		 	];

		 	$insert_result = Db::table('pz_dsp_account')->insert($insert_data);
		 	if ($insert_result) {
		 		$this->result('', '200', '注册成功');					
		 	} else {
		 		$this->result('', '401', '数据提交数据库添加失败');
		 	}
		 	
		} else {
			//验证码不正确
			$this->result('', '402', '验证码不正确');
		}
	}

}