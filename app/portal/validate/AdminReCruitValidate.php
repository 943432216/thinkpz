<?php

namespace app\portal\validate;

use think\Validate;

class AdminRecruitValidate extends Validate
{
	protected $rule = [
		'job_name' => 'require',
		'recruit_numbers' => 'require',
		'salary' => 'require',
		'work_place' => 'require',
		'post_time' => 'require',
		'expiry_time' => 'require',
	];

	protected $message = [
		'job_name.require' => '职业名称不能为空',
		'recruit_numbers.require' => '招聘人数不能为空',
		'salary.require' => '薪资不能为空',
		'work_place.require' => '工作地点不能为空',
		'post_time.require' => '发布时间不能为空',
		'expiry_time.require' => '有效时间不能为空',
	];

}