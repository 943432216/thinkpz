<?php

namespace app\portal\controller;

use cmf\controller\HomeBaseController;
use think\Db;

class MessageController extends HomeBaseController
{
	public function takeOver()
	{
		$msg = input('post.');
		
		$city = get_city();
		$msg['create_time'] = time();
		$msg['custom_ip'] = get_client_ip();
		$msg['custom_city'] = empty($city) ? '无法定位' : $city['region'] . $city['city'];

		$db_insert = Db::table('pz_custom_msg')->insert($msg);

		if ($db_insert) {
			$this->result('', 200, '留言成功');
		} else {
			$this->result('', 400, '留言失败，请重试或联系客服');
		}
	}
}